import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');

const dataSource = new ProductData('../public/json/tents.json');

const productPage = new ProductDetails(productId, dataSource);
productPage.init();

