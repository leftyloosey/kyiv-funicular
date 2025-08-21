import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Comment as Komment } from '../../utils/interfaces/comment';
import { HomeComponent } from './home';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../../shared/components/comment/comment';
import { CommentFormComponent } from '../../shared/components/comment-form/comment-form';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { CommentService } from '../../services/comment-service/comment.service';
import { firstValueFrom, Observable } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        CommonModule,
        CommentComponent,
        CommentFormComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getObservableValue should return value from observable', (done: DoneFn) => {
    const httpTesting = TestBed.inject(HttpTestingController);

    const commentService = fixture.debugElement.injector.get(CommentService);
    const displayComments: Komment[] = [];
    const spy = spyOn(commentService, 'submitCommentToService');
    const spy2 = spyOn(commentService, 'createCommentOnBackend');
    fixture.detectChanges();
    // commentService.getCommentsFromBackend().subscribe((value) => {
    //   expect(value).toBe([]);
    //   done();
    // });
    const testDTO = {
      text: 'test in a test',
      user: '688b540ca7acb4df90edaee7',
    };

    // const testSub = commentService.newComment;
    // testSub.subscribe((com) => {
    commentService.createCommentOnBackend(testDTO).subscribe((comment) => {
      expect(comment).toBe({
        id: '688b524ba7acb4df90edaee3',
        user: null,
        text: 'first comment',
        usersId: '6884393c87447f7edbacbd14',
        parentId: null,
        timestamp: new Date(),
      });
      // displayComments.push(comment);
      // expect(comment).toBeFalsy();
      // expect(comment).toContain('text');
      // expect(displayComments).toBeFalsy();
      // expect(displayComments).toHaveSize(3);
      done();
    });
    // });
  });
  // it('should what', async () => {
  //   const httpTesting = TestBed.inject(HttpTestingController);

  //   const commentService = fixture.debugElement.injector.get(CommentService);
  //   const displayComments: Komment[] = [];
  //   const spy = spyOn(commentService, 'submitCommentToService');
  //   const spy2 = spyOn(commentService, 'createCommentOnBackend');
  //   fixture.detectChanges();

  // });

  // const testDTO = {
  //   text: 'test in a test',
  //   user: '688b540ca7acb4df90edaee7',
  // };

  // const testSub = commentService.newComment;
  // const kom: Komment =
  // {
  //   id: '688b524ba7acb4df90edaee3',
  //   user: null,
  //   text: 'first comment',
  //   usersId: '6884393c87447f7edbacbd14',
  //   parentId: null,
  //   timestamp: new Date(),
  // };
  // displayComments.push(kom);

  // const allComments$ = commentService.getCommentsFromBackend();
  // const commentPromise = firstValueFrom(allComments$);

  // const req = httpTesting.expectOne('http://localhost:3000/comments', '');
  // expect(req.request.method).toBe('GET');
  // req.flush([]);
  // expect(await commentPromise).toEqual([]);
  // httpTesting.verify();

  // commentService.createCommentOnBackend(testDTO).subscribe((comment) => {
  //   displayComments.push(comment);
  //   displayComments.push(kom);
  // });

  // commentService.submitCommentToService({
  //   text: 'test in a test',
  //   user: '688b540ca7acb4df90edaee7',
  // });

  // expect(displayComments).toHaveSize(1);
  // expect(displayComments).toBeTruthy();
  // expect(spy).toHaveBeenCalled();
  // expect(spy2).toHaveBeenCalled();
});
