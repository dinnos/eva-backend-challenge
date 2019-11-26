import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
const request = require('supertest');

describe('BookingController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true }));
    await app.init();
  });

  describe('GET /booking/consumed-medications', () => {
    const baseUrl = '/booking/consumed-medications';
    let token;

    it('should return a 401 error', () => {
      return request(app.getHttpServer())
        .get(baseUrl)
        .expect(401)
        .expect({ statusCode: 401, error: 'Unauthorized' });
    });

    describe('Authentication/Authorization CUSTOMER_CARE', () => {
      it('should return an access_token', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'customer_care', password: 'customer_care' })
          .expect(res => {
            const { body: { access_token } } = res;

            if (!access_token && typeof access_token !== 'string') {
              throw new Error('Mising "access_token"');
            }

            token = access_token;
          });
      });

      it('should return a 403 error', () => {
        return request(app.getHttpServer())
          .get(baseUrl)
          .set('Authorization', `Bearer ${ token }`)
          .expect(403)
          .expect({ statusCode: 403, error: 'Forbidden', message: 'Forbidden resource' });
      });
    });

    describe('Authentication/Authorization GROWTH', () => {
      it('should return an access_token', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'growth', password: 'growth' })
          .expect(res => {
            const { body: { access_token } } = res;

            if (!access_token && typeof access_token !== 'string') {
              throw new Error('Mising "access_token"');
            }

            token = access_token;
          });
      });

      it('should return a 403 error', () => {
        return request(app.getHttpServer())
          .get(baseUrl)
          .set('Authorization', `Bearer ${ token }`)
          .expect(403)
          .expect({ statusCode: 403, error: 'Forbidden', message: 'Forbidden resource' });
      });
    });

    describe('Authentication/Authorization CUSTOMER_CARE/GROWTH', () => {
      it('should return an access_token', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'customer_care_growth', password: 'customer_care_growth' })
          .expect(res => {
            const { body: { access_token } } = res;

            if (!access_token && typeof access_token !== 'string') {
              throw new Error('Mising "access_token"');
            }

            token = access_token;
          });
      });

      it('should return a 403 error', () => {
        return request(app.getHttpServer())
          .get(baseUrl)
          .set('Authorization', `Bearer ${ token }`)
          .expect(403)
          .expect({ statusCode: 403, error: 'Forbidden', message: 'Forbidden resource' });
      });
    });

    describe('Authentication/Authorization CUSTOMER_CARE', () => {
      it('should return an access_token', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'science_data', password: 'science_data' })
          .expect(res => {
            const { body: { access_token } } = res;

            if (!access_token && typeof access_token !== 'string') {
              throw new Error('Mising "access_token"');
            }

            token = access_token;
          });
      });

      describe('Bad request errors', () => {
        it('should return a 400 error (Missing all required properties)', () => {
          return request(app.getHttpServer())
            .get(baseUrl)
            .send({})
            .set('Authorization', `Bearer ${ token }`)
            .expect(400)
            .expect({ statusCode: 400, error: 'Bad Request' });
        });

        describe('Bad Request missing some properties', () => {
          it('should return a 400 error (Missing period)', () => {
            return request(app.getHttpServer())
              .get(baseUrl)
              .send({
                clinicName: 'EXPLANADA',
                isStrict: false,
                consumedMedications: [],
              })
              .set('Authorization', `Bearer ${ token }`)
              .expect(400)
              .expect({ statusCode: 400, error: 'Bad Request' });
          });

          it('should return a 400 error (Missing clinicName)', () => {
            return request(app.getHttpServer())
              .get(baseUrl)
              .send({
                period: { start: '2019-11-26T01:19:51.813Z' },
                isStrict: false,
                consumedMedications: [],
              })
              .set('Authorization', `Bearer ${ token }`)
              .expect(400)
              .expect({ statusCode: 400, error: 'Bad Request' });
          });

          it('should return a 400 error (Missing isStrict)', () => {
            return request(app.getHttpServer())
              .get(baseUrl)
              .send({
                clinicName: 'EXPLANADA',
                period: { start: '2019-11-26T01:19:51.813Z' },
                consumedMedications: [],
              })
              .set('Authorization', `Bearer ${ token }`)
              .expect(400)
              .expect({ statusCode: 400, error: 'Bad Request' });
          });

          it('should return a 400 error (Missing consumedMedications)', () => {
            return request(app.getHttpServer())
              .get(baseUrl)
              .send({
                clinicName: 'EXPLANADA',
                isStrict: false,
                period: { start: '2019-11-26T01:19:51.813Z' },
              })
              .set('Authorization', `Bearer ${ token }`)
              .expect(400)
              .expect({ statusCode: 400, error: 'Bad Request' });
          });
        });
      });

      describe('Success request', () => {
        const clinicName = 'EXPLANADA';
        const containsSameClinicName = (element, clinic) => element.clinicName === clinic;
        const isBetweenPeriod = (date: Date, start: Date, end?: Date) => {
          const isGreater = date >= start;
          const isLower = end ? date <= end : true;

          return isGreater && isLower;
        };
        const containsSameElements = (expected: string[], response: string[]) => {
          if (expected.length !== response.length) {
            return false;
          }

          const expectedStr = expected.sort().toString();
          const responseStr = response.sort().toString();

          return expectedStr === responseStr;
        };

        const containsAtLeastOne = (expected: string[], response: string[]) => {
          return expected.some(value => response.includes(value));
        };

        it('should return a Ok response (200)', () => {
          return request(app.getHttpServer())
            .get(baseUrl)
            .send({
              clinicName,
              isStrict: false,
              period: { start: '2019-11-26T01:19:51.813Z' },
              consumedMedications: [],
            })
            .set('Authorization', `Bearer ${ token }`)
            .expect(200)
            .expect(req => {
              const data = req.body;

              data.forEach(booking => {
                const { datetime } = booking;

                if (!containsSameClinicName(booking, clinicName) || !isBetweenPeriod(new Date(datetime), new Date('2019-11-26T01:19:51.813Z'))) {
                  throw new Error('Invalid response');
                }
              });
            });
        });

        it('should return a Ok response (200) Strict Mode', () => {
          const consumedMedicationsQuery = ['ANTIBIOTICS', 'HORMONE_THERAPY', 'BLOOD_THINNERS', 'COAGULANTS'];

          return request(app.getHttpServer())
            .get(baseUrl)
            .send({
              clinicName,
              isStrict: true,
              period: { start: '2019-11-26T01:19:51.813Z' },
              consumedMedications: consumedMedicationsQuery,
            })
            .set('Authorization', `Bearer ${ token }`)
            .expect(200)
            .expect(req => {
              const data = req.body;

              data.forEach(booking => {
                const { datetime, consumedMedications } = booking;

                if (
                  !containsSameClinicName(booking, clinicName) ||
                  !isBetweenPeriod(new Date(datetime), new Date('2019-11-26T01:19:51.813Z')) ||
                  !containsSameElements(consumedMedicationsQuery, consumedMedications)
                ) {
                  throw new Error('Invalid response');
                }
              });
            });
        });

        it('should return a Ok response (200) Lax Mode', () => {
          const consumedMedicationsQuery = ['ANTIBIOTICS', 'HORMONE_THERAPY', 'BLOOD_THINNERS', 'COAGULANTS'];

          return request(app.getHttpServer())
            .get(baseUrl)
            .send({
              clinicName,
              isStrict: false,
              period: { start: '2019-11-26T01:19:51.813Z' },
              consumedMedications: consumedMedicationsQuery,
            })
            .set('Authorization', `Bearer ${ token }`)
            .expect(200)
            .expect(req => {
              const data = req.body;

              data.forEach(booking => {
                const { datetime, consumedMedications } = booking;

                if (
                  !containsSameClinicName(booking, clinicName) ||
                  !isBetweenPeriod(new Date(datetime), new Date('2019-11-26T01:19:51.813Z')) ||
                  !containsAtLeastOne(consumedMedicationsQuery, consumedMedications)
                ) {
                  throw new Error('Invalid response');
                }
              });
            });
        });
      });
    });
  });
});
