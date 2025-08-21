import { TestBed } from '@angular/core/testing';
import { Comment as Komment } from '../../utils/interfaces/comment';
import { CommentService } from './comment.service';
import { CommonModule } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        provideRouter(routes),
      ],
    });
    service = TestBed.inject(CommentService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('get() return data if successful', (done: DoneFn) => {
    const httpTesting = TestBed.inject(HttpTestingController);
    const testDTO = {
      text: 'test in a test',
      user: '688b540ca7acb4df90edaee7',
    };
    const kom: Komment = {
      id: '688b524ba7acb4df90edaee3',
      user: null,
      text: 'first comment',
      usersId: '6884393c87447f7edbacbd14',
      parentId: null,
      timestamp: new Date(),
    };
    const successRes: Komment = {
      text: 'first comment',
      timestamp: new Date(),
      // timestamp: '2025-07-31T11:23:54.441Z',
      id: '688b524ba7acb4df90edaee3',
      user: {
        name: 'lord byron',
        _id: '',
        password: '',
      },
      parentId: null,
      usersId: '',
    };

    service.createCommentOnBackend(testDTO).subscribe((data) => {
      expect(data).toEqual(successRes);
      done();
    });
    const req = httpTesting.expectOne({
      method: 'POST',
    });
    expect(req.request.body).toEqual(testDTO);
    req.flush(successRes);

    afterEach(() => {
      httpTesting.verify();
    });
  });
});
