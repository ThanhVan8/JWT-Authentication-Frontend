import { Photo } from '../../../types/Photo';
import { Link } from 'react-router-dom';

interface PhotoContainerProps {
  photo: Photo;
}

const PhotoContainer = ({ photo }: PhotoContainerProps) => {
  return (
    <div className="relative w-full mb-4">
      <Link to={`/photos/${photo.id}`}>
        <img className="w-full rounded-md" src={photo.urls.small} alt={photo.id} />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-20 hover:cursor-pointer rounded-md">
          <div className="w-full h-full text-white p-4 flex items-end opacity-0 hover:opacity-100">
            <div className="flex items-center gap-2">
              <img src={photo.user.profile_image.small} alt={photo.user.name} className="rounded-full w-8 h-8" />
              <p>{photo.user.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PhotoContainer;