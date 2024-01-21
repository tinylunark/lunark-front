import { TestBed } from "@angular/core/testing";
import { AccountService } from "./account.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Account } from "./model/account.model";


describe('AccountService', () => {
    let service: AccountService;
    let httpController: HttpTestingController;
    const url = 'http://localhost:8080/api/accounts';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      service = TestBed.inject(AccountService);
      httpController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpController.verify();
      });
    
    it('should be created', () => {
        expect(service).toBeTruthy();
    });  

    it('should call signUp and the API returns the newly created user', () => {
        const mockAccount: Account = {
            email: 'test@example.com',
            password: 'password',
            name: 'Test User',
            surname: 'Test Surname',
            phoneNumber: '123456789',
            address: 'Test Address',
            role: 'GUEST'
        };

        const mockResponse: Account = {
            id: 1,
            email: 'test@example.com',
            password: 'password',
            name: 'Test User',
            surname: 'Test Surname',
            phoneNumber: '123456789',
            address: 'Test Address',
            role: 'GUEST'
        };

        service.signUp(mockAccount).subscribe((response: Account) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpController.expectOne({
            method: 'POST',
            url: `${url}`,
        });
        req.flush(mockResponse); 
    });

    it('should call verify and the API returns a message that the account is verified', () => {
        let verificationLinkId = 1;
        let verifcationLink = `http://localhost:8080/api/accounts/verify/${verificationLinkId}`
        const mockResponse: string = 'Account verified successfully';

        service.verify(verificationLinkId).subscribe((response: string) => {  
            expect(response).toEqual(mockResponse);
        });

        const req = httpController.expectOne({
            method: 'POST',
            url: `${verifcationLink}`,
        });
        req.flush(mockResponse);
    });
});
