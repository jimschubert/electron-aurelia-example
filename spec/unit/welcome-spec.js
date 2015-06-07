import {Welcome} from 'welcome';

describe('the Welcome module', () => {
  it('calls confirm on canDeactivate', () => {
    var sut = new Welcome(),
      global = jasmine.getGlobal();

    spyOn(global, "confirm");

    sut.firstName = 'Jim';
    sut.canDeactivate();
    expect(global.confirm).toHaveBeenCalled();
  });
});
