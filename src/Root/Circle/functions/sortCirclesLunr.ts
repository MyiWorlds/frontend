import lunr from 'lunr';
import { SearchCircle } from '../queries/Search/searchTypes';

function arrayMove(
  circles: SearchCircle[],
  fromIndex: number,
  toIndex: number,
) {
  const element = circles[fromIndex];
  circles.splice(fromIndex, 1);
  circles.splice(toIndex, 0, element);
}

const sortArrayLunr = (circles: SearchCircle[], searchFieldString: string) => {
  if (!circles || !circles.length) return [];

  const lunrSetup: any = lunr(function() {
    this.ref('id');
    this.field('title');
    this.field('description');
    this.field('tags');

    circles.forEach(circles => {
      this.add(circles);
    });
  });

  let lunrSortList = lunrSetup.search(searchFieldString);

  if (lunrSortList.length) {
    lunrSortList = lunrSortList.map((lunrResult: any) => lunrResult.ref);

    lunrSortList.forEach((itemId: string, index: number) => {
      function matchingIndex(circle: SearchCircle) {
        return circle.id === itemId;
      }

      const moveFromIndex = circles.findIndex(matchingIndex);
      arrayMove(circles, moveFromIndex, index);
    });
  }

  return circles;
};

export default sortArrayLunr;
