import SinglePage from './singlepage/SinglePage';

const availableMangaFields = {
  str: ['Type', 'Volumes', 'Chapters', 'Status'],
  otherInfo: ['Synopsis', 'Background'],
  arrs: ['Themes', 'Demographics', 'Serializations', 'Authors'],
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
