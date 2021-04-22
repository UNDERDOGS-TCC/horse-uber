import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GanheDinheiroCavalgandoPage } from './ganhe-dinheiro-cavalgando.page';

describe('GanheDinheiroCavalgandoPage', () => {
  let component: GanheDinheiroCavalgandoPage;
  let fixture: ComponentFixture<GanheDinheiroCavalgandoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GanheDinheiroCavalgandoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GanheDinheiroCavalgandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
