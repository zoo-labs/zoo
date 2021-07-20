import axios from "axios"; // Requests
import client from "data"; // GraphQL requests
import { ZORA_MEDIA_BY_ID } from "@data/queries"; // GraphQL Queries

/**
 * Collect Zoo media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zoo media details
 */
export const getPostByID = async (id) => {
  // Collect post
  let post = await client.request(ZORA_MEDIA_BY_ID(id));
  post = post.media;

  // Collect post metadata
  const metadata = await axios.get(post.metadataURI);
  post.metadata = metadata.data;

  // Only show Zoo posts
  if (post.metadata.version !== "zoo-20210101") {
    return undefined;
  }

  // If text media, collect post content
  if (metadata.data.mimeType.startsWith("text")) {
    const text = await axios.get(post.contentURI);
    post.contentURI = text.data;
  }

  // Return post
  return post;
};
