import client, { previewClient } from "lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

export const getPaginatedPosts = async (page, limit = 3) => {
  const posts = await client.fetch(
    `*[_type=="post"]{_createdAt, title, subtitle, date, 'image': cover_image.asset->url, 'slug':slug.current, 'publisher':publisher->{title, 'picture': picture.asset->url }}|order(date asc)[${
      page * limit
    }...${(page + 1) * limit}]`
  );
  return posts;
};

export const getAllPosts = async () => {
  const posts = await client.fetch(
    `*[_type=="post"]{_createdAt, title, subtitle, date, 'image': cover_image.asset->url, 'slug':slug.current, 'publisher':publisher->{title, 'picture': picture.asset->url }}|order(date asc)`
  );
  return posts;
};

export const getPostBySlug = async (slug, preview = false) => {
  let myClient = preview ? previewClient : client;

  const post = await myClient.fetch(
    `*[_type=="post" && slug.current==$slug]{_createdAt, title, subtitle, date, content[]{...,'asset': asset->} , cover_image, 'slug':slug.current, 'publisher':publisher->{title, 'picture': picture.asset->url,  }}`,
    { slug }
  );
  return post;
};

export const listenPostUpdate = async (slug, fn) => {
  return previewClient
    .listen(
      `*[_type=="post" && slug.current==$slug]{_createdAt, title, subtitle, date, content[]{...,'asset': asset->} , cover_image, 'slug':slug.current, 'publisher':publisher->{title, 'picture': picture.asset->url,  }}`,
      { slug }
    )
    .subscribe(fn);
};
