import { addOneMonth } from '@src/util/misc';

describe('Miscellenious helper', () => {
  it('should add one month to a string', () => {
    expect(addOneMonth('2022-02')).toEqual('2022-03');
    expect(addOneMonth('2022-12')).toEqual('2023-01');
  });
});
