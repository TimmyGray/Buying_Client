import { Buy } from './Buy';
import { Image } from './image';

describe('Buy model', () => {
  const image = new Image('img', 'name', 1, 'image/png', '');

  it('should default custom to false', () => {
    const buy = new Buy('1', 'n', 'd', 1, 'item', 'item-id', 1, image);
    expect(buy.custom).toBeFalse();
  });

  it('should allow custom=true for custom products', () => {
    const buy = new Buy('1', 'n', 'd', 1, 'item', 'item-id', 1, image, true);
    expect(buy.custom).toBeTrue();
  });
});
