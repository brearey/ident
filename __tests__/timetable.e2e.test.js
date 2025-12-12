"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../src/database/db");
const TEST_PORT = 5201;
const IDENT_KEY = 'test-key';
const BASE_URL = `http://localhost:${TEST_PORT}`;
jest.setTimeout(30000);
describe('POST /PostTimeTable (e2e)', () => {
    const pool = (0, db_1.createPool)('localhost', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const maxAttempts = 10;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                yield axios_1.default.get(`${BASE_URL}/health`);
                return;
            }
            catch (err) {
                console.error(err);
                yield new Promise((resolve) => setTimeout(resolve, 500));
            }
        }
        throw new Error(`Server is not running on ${BASE_URL}`);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield pool.end();
    }));
    it('should upsert timetable without duplicates on repeated calls', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const branchId = 9000 + Math.floor(Math.random() * 1000);
        const doctorId = 8000 + Math.floor(Math.random() * 1000);
        const startIso = new Date(Date.UTC(2030, 0, 1, 10, 0, 0))
            .toISOString()
            .replace(/\.\d{3}Z$/, '+00:00');
        const payload = {
            Doctors: [
                { Id: doctorId, Name: `Доктор ${doctorId}` },
            ],
            Branches: [
                { Id: branchId, Name: `Филиал ${branchId}` },
            ],
            Intervals: [
                {
                    DoctorId: doctorId,
                    BranchId: branchId,
                    StartDateTime: startIso,
                    LengthInMinutes: 60,
                    IsBusy: false,
                },
                {
                    DoctorId: doctorId,
                    BranchId: branchId,
                    StartDateTime: startIso.replace('10:00:00', '12:00:00'),
                    LengthInMinutes: 30,
                    IsBusy: true,
                },
            ],
        };
        const headers = {
            'IDENT-Integration-Key': IDENT_KEY,
            'Content-Type': 'application/json',
        };
        const postOnce = yield axios_1.default.post(`${BASE_URL}/PostTimeTable`, payload, { headers });
        expect(postOnce.status).toBe(200);
        const postTwice = yield axios_1.default.post(`${BASE_URL}/PostTimeTable`, payload, { headers });
        expect(postTwice.status).toBe(200);
        const result = yield (0, db_1.query)(pool, `SELECT COUNT(*)::int as cnt FROM "IDENT_Intervals" WHERE "BranchId" = $1 AND "DoctorId" = $2`, [branchId, doctorId]);
        expect((_a = result === null || result === void 0 ? void 0 : result.rows[0]) === null || _a === void 0 ? void 0 : _a.cnt).toBe(2);
    }));
});
