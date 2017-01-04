/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from "@angular/core/testing"
import {GitHubComponent} from "./github.component"

describe('GitHubComponent', () => {
	let component: GitHubComponent;
	let fixture: ComponentFixture<GitHubComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GitHubComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GitHubComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
