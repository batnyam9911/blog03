import { Row, Col, Button } from "react-bootstrap";
import GridItem from "components/grid-item";
import Layout from "components/layout";
import Intro from "components/intro";
import { useSWRInfinite } from "swr";
import { getPaginatedPosts } from "../lib/api";
import PreviewAlert from "components/preview-alert";
import Nprogress from "nprogress";

const PAGE_LIMIT = 3;

export default function Home({ posts, preview }) {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/api/posts?page=${index}&limit=${PAGE_LIMIT}`,
    { initialData: [posts] }
  );

  return (
    <Layout>
      <Row>
        {preview && <PreviewAlert />}
        <Col md="12">
          <Intro />
        </Col>
      </Row>
      <hr />
      <pre>{/*JSON.stringify(data, null, 2)*/}</pre>
      <Row className="mb-5">
        {data.map((page) =>
          page.map((post) => (
            <Col md={12 / PAGE_LIMIT}>
              <GridItem post={post} />
            </Col>
          ))
        )}
      </Row>
      <div style={{ textAlign: "center" }}>
        {data[data.length - 1].length !== 0 &&
          (isValidating ? (
            <div style={{ fontSize: 14 }}>Түр хүлээнэ үү ...</div>
          ) : (
            <Button onClick={() => setSize(size + 1)}>Дахиад үзэх ...</Button>
          ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ preview = false }) => {
  const posts = await getPaginatedPosts(0, PAGE_LIMIT);
  console.log("index.html Дахин build хийгдлээ");

  return {
    props: {
      posts,
      preview,
    },
    revalidate: 10,
  };
};
