/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing"
import {KitsuService} from "./kitsu.service"

describe('KitsuService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [KitsuService]
		});
	});

	it('should ...', inject([KitsuService], (service: KitsuService) => {
		expect(service).toBeTruthy();
	}));
});
