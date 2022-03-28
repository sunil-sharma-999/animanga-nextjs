export const dateConvertor = (validDate, startDate, endDate) => {
  if (!startDate && !endDate) {
    return '';
  }
  if (validDate) {
    return startDate + '-' + endDate;
  } else {
    startDate = !!startDate
      ? new Date(startDate).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : '';

    endDate = endDate
      ? new Date(endDate).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : '';

    return startDate + '-' + endDate;
  }
};
