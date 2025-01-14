import Carousel from '@/components/commons/Carousel';
import { ArrowLeft, ArrowRight } from '@/libs/utils/Icon';

import { FoodTourSlide, SeoulSlide, SummerSlide } from './Slides';

export default function CarouselContainer() {
  return (
    <Carousel.Root>
      <Carousel.Slide>
        <SummerSlide />
      </Carousel.Slide>
      <Carousel.Slide>
        <SeoulSlide />
      </Carousel.Slide>
      <Carousel.Slide>
        <FoodTourSlide />
      </Carousel.Slide>

      <Carousel.Navigator>
        {(prev, next) => (
          <div className="hidden xl:group-hover/carousel:block">
            <button
              type="button"
              onClick={prev}
              className="absolute left-24 top-1/2 z-20 size-32 -translate-y-1/2 transform pr-4 hover:opacity-80 md:size-48 xl:size-60"
            >
              <ArrowLeft width="100%" height="100%" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-24 top-1/2 z-20 size-32 -translate-y-1/2 transform pl-4 hover:opacity-80 md:size-48 xl:size-60 xl:pl-6"
            >
              <ArrowRight width="100%" height="100%" />
            </button>
          </div>
        )}
      </Carousel.Navigator>
      <Carousel.Indicator />
    </Carousel.Root>
  );
}
