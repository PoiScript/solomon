/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing"
import {GitHubService} from "./github.service"

describe('GitHubService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [GitHubService]
		});
	});

	it('should ...', inject([GitHubService], (service: GitHubService) => {
		expect(service).toBeTruthy();
	}));
});
