import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommentCreatedEvent } from '@src/comments/events/comment-created.event';

@Injectable()
export class CommentCreatedListener {
  @OnEvent('comment.created')
  handleCommentCreatedEvent(event: CommentCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    console.log('event-----', event);
  }
}
