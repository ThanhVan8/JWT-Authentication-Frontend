import { useState, useEffect } from 'react';
import { instanceUnsplash } from '../../config/axios-config';
import PhotoContainer from './photo-container/PhotoContainer';
import { Photo } from '../../types/Photo';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import Masonry from 'react-masonry-css';
import '../../index.css';

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await instanceUnsplash.get<Photo[]>('/photos', {
        params: {
          page: page,
          per_page: 6,
        },
      });
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
      if (response.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={() => setPage((prevPage) => prevPage + 1)}
      hasMore={hasMore}
      loader={
        <div className="w-full flex items-center">
          <ClipLoader className="mx-auto" color="#000" loading={loading} size={35} />
        </div>
      }
      endMessage={<p style={{ textAlign: 'center' }}>No more photos to show</p>}
      style={{ overflow: 'hidden' }}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid overflow-hidden"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo, index) => (
          <PhotoContainer key={index} photo={photo} />
        ))}
      </Masonry>
    </InfiniteScroll>
  );
};

export default Gallery;