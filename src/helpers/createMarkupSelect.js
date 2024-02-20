function createMarkupSelect(arr) {
  return arr
    .map(
      ({ name, reference_image_id }) =>
        `<option value="${reference_image_id}">${name}</option>`
    )
    .join('');
}

export { createMarkupSelect };
