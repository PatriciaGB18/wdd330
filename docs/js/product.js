import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');
// Corrigido o caminho do JSON
const dataSource = new ProductData('../json/tents.json');

const productPage = new ProductDetails(productId, dataSource);
productPage.init();

