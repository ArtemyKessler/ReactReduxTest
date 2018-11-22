export const deleteBulletin = bulletin => {
  return {
    type: "BULLETIN_DELETE",
    payload: bulletin
  };
};
