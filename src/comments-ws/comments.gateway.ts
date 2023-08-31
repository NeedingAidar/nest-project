import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { BookCommentsService } from '../comments/book-comments.service';

@WebSocketGateway()
export class CommentsGateway {
    @WebSocketServer() server;

    constructor(private readonly commentsService: BookCommentsService) {}

    @SubscribeMessage('getAllComments')
    getAllComments(client, payload: { bookId: number }) {
        return this.commentsService.findAllBookComment(payload.bookId);
    }

    @SubscribeMessage('addComment')
    addComment(client, payload: { bookId: number, comment: string }) {
        const newComment = {
            id: Date.now(),
            bookId: payload.bookId,
            comment: payload.comment
        };
        this.commentsService.create(newComment);
        return newComment;
    }
}
