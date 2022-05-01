import SinglePage from './singlepage/SinglePage';

const availableAnimeFields = {
  str: ['Type', 'Episodes', 'Source', 'Status'],
  otherInfo: ['Synopsis', 'Background'],
  arrs: ['Themes', 'Demographics', 'Genres', 'Studios', 'Producers'],

  filterAvailables: (data, fields) => {
    const availables = [];
    fields.map((field) => {
      if (
        data[field.toLocaleLowerCase()] &&
        data[field.toLocaleLowerCase()].length > 0
      ) {
        availables.push(field);
      }
    });
    return availables;
  },
};

const Anime = ({ id }) => {
  return (
    <SinglePage
      id={id}
      type="anime"
      availableMediaFields={availableAnimeFields}
    />
  );
};

export default Anime;
