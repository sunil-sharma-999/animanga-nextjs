import { deleteField, doc, getDoc, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';

const addFavorites = async ({ data, typename, authState }) => {
  const startDate =
    (data.aired && data.aired.from) ||
    (data.published && data.published.from) ||
    '';
  const endDate =
    (data.aired && data.aired.to) ||
    (data.published && data.published.to) ||
    '';

  const imageUrl =
    data.image_url ||
    data.images.webp.image_url ||
    data.images.jpg.image_url ||
    '';
  data = {
    title: data.title,
    mal_id: data.mal_id,
    rank: data.rank || null,
    score: data.scored || data.score || null,
    start_date: startDate,
    end_date: endDate,
    image_url: imageUrl,
    type: data.type,
  };

  const docRef = doc(db, 'users', authState);

  try {
    const res = await getDoc(docRef);
    const resData = res.data();

    let exist = Object.keys(resData.favorites).find(
      (fav) => fav === `${typename}:${data.mal_id}`,
    );
    const updatedValue = exist
      ? {
          [`favorites.${exist}`]: deleteField(),
        }
      : {
          favorites: {
            ...resData.favorites,
            [`${typename}:${data.mal_id}`]: data,
          },
        };

    await updateDoc(docRef, updatedValue);
  } catch (error) {
    console.log(error);
  }
  return 'success';
};

export default addFavorites;
