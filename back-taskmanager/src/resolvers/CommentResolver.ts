/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import CreateCommentInput from '../entity/inputs/CreateCommentInput';
import CommentModels from '../models/CommentModel';
import Comment from '../entity/entities/Comment';

@Resolver(Comment)
class CommentResolver {

  @Query(() => [Comment])
  async allComments() {
    const comments = await CommentModels.find();
    return comments;
  }

  @Mutation(() => Comment)
  async createComment(@Arg('commentInput') createCommentInput: CreateCommentInput
  ) {
    try {
      const newComment = new CommentModels(createCommentInput);
      await newComment.save();
      return newComment;
    } catch (err) {
      return console.log('err', err);
    }
  }
}
export default CommentResolver;
