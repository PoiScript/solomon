/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing"
import {KitsuComponent} from "./kitsu.component"

describe('KitsuComponent', () => {
	let component: KitsuComponent;
	let fixture: ComponentFixture<KitsuComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [KitsuComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(KitsuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
