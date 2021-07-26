import * as React from "react";
import classnames from "classnames/bind";
import styles from "../product-details/ProductDetailsComponent.scss";
import {Container, Row, Col, Toast} from "react-bootstrap";
import {useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductsSelector} from "../../../selectors/landingPageSelectors";
import {getProduct, getProductPrice} from "../../../utils/common/commonUtils";
import {getStoreSelector} from "../../../selectors/commonSelectors";
import Button from "react-bootstrap/Button";
import * as settings from "../../../settings";
import {useEffect, useState} from "react";
import {getProducts} from "../../../actions/landingPageActions";
import {IProduct} from "../../../types/feature/LandingPageComponentTypes";
import loadingImg from "../../../assets/loading.gif";
import {StarFill} from "react-bootstrap-icons";
import {doCheckout} from "../../../actions/productDetailsActions";
import {getErrorSelector, getLoadingSelector} from "../../../selectors/productDetailsSelectors";

const cx = classnames.bind(styles);

export interface MatchParams {
    productId: string;
}

const ProductDetailsComponent = () => {

    const dispatch = useDispatch();
    const match = useRouteMatch<MatchParams>("/product/:productId");
    const productId = Number(match?.params?.productId) || 1;
    const products = useSelector(getProductsSelector);
    const store = useSelector(getStoreSelector);
    const loading = useSelector(getLoadingSelector);
    const showError = useSelector(getErrorSelector);

    const [product, setProduct] = useState<IProduct>(getProduct(productId, products));
    const [showToast, setShowToast] = useState(false);

    const toggleShowToast = () => setShowToast(!showToast);

    useEffect(() => {
        if (products.length === 0 || !products) {
            // if user refreshes page
            dispatch(getProducts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setProduct(getProduct(productId, products));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    useEffect(() => {
        if (showError) {
            setShowToast(true);
        }
    }, [showError])

    const handleSrc = (product: IProduct) => product ? `${settings.DEMO_SERVER_NO_PROXY}/images/${product.image}` : loadingImg

    const handleCheckout = (product: IProduct) => {
        dispatch(doCheckout(product));
    }

    const renderImgCol = () => {
        return (
            <Col xs={12} sm={12} md={6} className={cx("justify-content-center", "m-auto", "img-col")}>
                <img src={handleSrc(product)} alt=""/>
            </Col>
        )
    }

    const renderTextCol = () => {
        return (
            <Col xs={12} sm={12} md={6} className={cx("text-col")}>
                <div><h1>{product?.title || ""}</h1></div>
                <div>{[...Array(product?.stars)].map((e, i) => <StarFill key={i}/>)}</div>
                <div className={cx("price")}>{getProductPrice(store, product?.price) || ""}</div>
                <div>{product?.description || ""}</div>
                <Button variant={'dark'} disabled={loading} className={cx("checkout-btn")}
                        onClick={() => handleCheckout(product)} active>
                    {loading ? 'Loading...' : 'Checkout with Ablr'}
                </Button>
            </Col>
        )
    }

    const renderToast = () => {
        return (
            <Toast data-testid={'error-toast'} className={cx("toast")} show={showToast} onClose={toggleShowToast} delay={5000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>Something went wrong...</Toast.Body>
            </Toast>
        )
    }

    return (
        <Container fluid data-testid={"container-product-details"}>
            {renderToast()}
            <Row className={cx("justify-content-space-between", "product-details")}>
                {renderImgCol()}
                {renderTextCol()}
            </Row>
        </Container>
    )
}

export default ProductDetailsComponent;