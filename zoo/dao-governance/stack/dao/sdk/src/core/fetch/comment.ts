import { Comment } from '../types/Discussion';
import { genericFetchAndThrowIfError } from './common/generic';
import { routes } from './common/routes';
import {
  GetAllCommentsParams,
  CreateCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
} from './common/params';

/**
 * Fetches all comments for a specific proposal.
 * @param params - The parameters for fetching comments.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.slug - The slug of the proposal.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Comment[]>} A promise with an array of comments.
 */
export const getAllComments = async (params: GetAllCommentsParams): Promise<Comment[]> => {
  const { chainId, address, slug, apiUrl } = params;
  const comments = await genericFetchAndThrowIfError<Comment[]>({
    route: routes.comment(chainId, address, slug),
    apiUrl,
  });
  return comments;
};

/**
 * Creates a new comment for a specific proposal.
 * @param params - The parameters for creating a comment.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.slug - The slug of the proposal.
 * @param params.comment - The new comment data.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Comment>} A promise with the created comment.
 */
export const createComment = async (params: CreateCommentParams): Promise<Comment> => {
  const { chainId, address, slug, comment, apiUrl } = params;
  const createdComment = await genericFetchAndThrowIfError<Comment>({
    route: routes.comment(chainId, address, slug),
    options: {
      method: 'POST',
      body: JSON.stringify(comment),
    },
    apiUrl,
  });
  return createdComment;
};

/**
 * Updates an existing comment.
 * @param params - The parameters for updating a comment.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.slug - The slug of the proposal.
 * @param params.commentId - The ID of the comment to update.
 * @param params.comment - The updated comment data.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Comment>} A promise with the updated comment.
 */
export const updateComment = async (params: UpdateCommentParams): Promise<Comment> => {
  const { chainId, address, slug, commentId, comment, apiUrl } = params;
  const updatedComment = await genericFetchAndThrowIfError<Comment>({
    route: `${routes.comment(chainId, address, slug)}/${commentId}`,
    options: {
      method: 'PUT',
      body: JSON.stringify(comment),
    },
    apiUrl,
  });
  return updatedComment;
};

/**
 * Deletes a comment.
 * @param params - The parameters for deleting a comment.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.slug - The slug of the proposal.
 * @param params.commentId - The ID of the comment to delete.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Comment>} A promise with the deleted comment.
 */
export const deleteComment = async (params: DeleteCommentParams): Promise<void> => {
  const { chainId, address, slug, commentId, apiUrl } = params;
  await genericFetchAndThrowIfError<void>({
    route: `${routes.comment(chainId, address, slug)}/${commentId}`,
    options: {
      method: 'DELETE',
    },
    apiUrl,
  });
};
