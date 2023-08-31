import { Module } from '@nestjs/common';
import { CommentsGateway } from './comments.gateway';
import { BookCommentsService } from '../comments/book-comments.service';
import { CommentsModule } from '../comments/book-comments.module';

@Module({
    imports: [CommentsModule],
    providers: [CommentsGateway, BookCommentsService],
    exports: [CommentsGateway]
})
export class CommentsWsModule {}
