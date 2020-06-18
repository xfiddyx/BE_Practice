const formattedCompany = (companies, owners) => {
  const formattedCompany = companies.map((comp) => {
    const ownerMatch = owners.find((owner) => {
      return owner.surname === comp.founder.surname;
    });
    if (!ownerMatch) {
      ownerMatch == 'does not own a business';
    }
    const companyObj = { ...comp };
    companyObj.owner_id = ownerMatch.owner_id;
    delete companyObj.founder;
    return companyObj;
  });
  return formattedCompany;
};

const formattedProducts = (products, companies) => {
  const formattedProducts = products.map((prod) => {
    const companyMatch = companies.find((comp) => comp.name === prod.company);
    const productObj = { ...prod };
    productObj.company_id = companyMatch.company_id;
    delete productObj.company;
    return productObj;
  });
  return formattedProducts;
};

module.exports = {
  formattedCompany,
  formattedProducts,
};
