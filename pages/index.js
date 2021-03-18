import { Row, Col, Button } from "react-bootstrap";
import GridItem from "components/grid-item";
import { getAllPosts } from "lib/api";
import Layout from "components/layout";
import Intro from "components/intro";
import { useSWRInfinite } from "swr";
import { getPaginatedPosts } from "../lib/api";
import PreviewAlert from "components/preview-alert";

const PAGE_LIMIT = 3;

export default function Home({ posts, preview }) {
  const { data, size, setSize } = useSWRInfinite(
    (index) => `/api/posts?page=${index}&limit=${PAGE_LIMIT}`
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
        {data &&
          data.map((page) =>
            page.map((post) => (
              <Col md={12 / PAGE_LIMIT}>
                <GridItem post={post} />
              </Col>
            ))
          )}
      </Row>
      <div style={{ textAlign: "center" }}>
        {data && data[data.length - 1].length !== 0 && (
          <Button onClick={() => setSize(size + 1)}>Цааш нь ...</Button>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ preview = false }) => {
  const posts = await getPaginatedPosts(1, PAGE_LIMIT);

  return {
    props: {
      posts,
      preview,
    },
  };
};
