import SinglePage from './singlepage/SinglePage';

const availableMangaFields = {
  str: ['Rank', 'Type', 'Volumes', 'Chapters', 'Status'],
  otherInfo: ['Synopsis', 'Background'],
  arrs: ['Published', 'Themes', 'Demographics', 'Serializations', 'Authors'],
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

const Manga = ({ id }) => {
  return (
    <SinglePage
      id={id}
      type="manga"
      availableMediaFields={availableMangaFields}
    />
  );
};

export default Manga;
