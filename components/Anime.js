import SinglePage from './singlepage/SinglePage';

const availableAnimeFields = {
  str: ['Rank', 'Type', 'Episodes', 'Source', 'Status'],
  otherInfo: ['Synopsis', 'Background'],
  arrs: ['Aired', 'Themes', 'Demographics', 'Genres', 'Studios', 'Producers'],

  filterAvailables: (data, fields) => {
    const availables = [];
    fields.map((field) => {
      if (data[field.toLocaleLowerCase()]) {
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
