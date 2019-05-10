/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CallScAgService } from 'app/entities/call-sc-ag/call-sc-ag.service';
import { ICallScAg, CallScAg, CallState } from 'app/shared/model/call-sc-ag.model';

describe('Service Tests', () => {
  describe('CallScAg Service', () => {
    let injector: TestBed;
    let service: CallScAgService;
    let httpMock: HttpTestingController;
    let elemDefault: ICallScAg;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CallScAgService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CallScAg(0, currentDate, CallState.NEW);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateCall: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a CallScAg', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCall: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateCall: currentDate
          },
          returnedFromService
        );
        service
          .create(new CallScAg(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a CallScAg', async () => {
        const returnedFromService = Object.assign(
          {
            dateCall: currentDate.format(DATE_FORMAT),
            stateCall: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCall: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of CallScAg', async () => {
        const returnedFromService = Object.assign(
          {
            dateCall: currentDate.format(DATE_FORMAT),
            stateCall: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateCall: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CallScAg', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
