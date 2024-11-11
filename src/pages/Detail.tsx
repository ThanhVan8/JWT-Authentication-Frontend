import { instanceUnsplash } from "../config/axios-config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Photo } from "../types/Photo";
import { ClipLoader } from "react-spinners";

const Detail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);

  const getPhoto = async () => {
    setLoading(true);
    try {
      const response = await instanceUnsplash.get<Photo>(`/photos/${id}`);
      setPhoto(response.data);
    } catch (error) {
      console.error('Error fetching photo:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPhoto();
  }, []);

  return (      
    <div className="flex flex-col gap-4">
      {loading && 
        <ClipLoader className="self-center" />
      }
      {photo &&
        <>
          <div className="flex items-center gap-2">
            <img src={photo.user.profile_image.small} alt={photo.user.name} className="rounded-full w-8 h-8" />
            <p>{photo.user.name}</p>
          </div>
          <img className="w-full" src={photo.urls.full} alt={photo.description} />
          {photo.description ? <p>{photo.description}</p> : <p>No description</p>}
        </>
      }
      {
        !loading && !photo &&
        <p className="text-center">Photo not found</p>
      }
    </div>
  )
}

export default Detail;