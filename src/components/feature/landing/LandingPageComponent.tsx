import * as React from "react";
import {useEffect, useState} from "react";
import classnames from "classnames/bind";
import styles from "./LandingPageComponent.scss";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../actions/landingPageActions";
import {getProductsSelector} from "../../../selectors/landingPageSelectors";
import * as settings from "../../../settings";
import imgNotFound from "../../../assets/img-not-found.png";
import loadingImg from "../../../assets/loading.gif";
import {IProduct} from "../../../types/feature/LandingPageComponentTypes";
import {getStoreSelector} from "../../../selectors/commonSelectors";
import {getProductPrice} from "../../../utils/common/commonUtils";
import {useHistory} from "react-router-dom";

const cx = classnames.bind(styles);

const LandingPageComponent = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const products = useSelector(getProductsSelector);
    const store = useSelector(getStoreSelector);
    const [loadedPics, setLoadedPics] = useState<number[]>([])

    const handleImgErr = (e: any) => e.target.src = imgNotFound;

    const handleOnLoad = (id: number) => setLoadedPics(prev => [...prev, id]);

    const handleSrc = (product: IProduct) => loadedPics.includes(product.id) ? `${settings.DEMO_SERVER_NO_PROXY}/images/${product.image}` : loadingImg

    useEffect(() => {
        dispatch(getProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onProductCardClick = (id: number) => {
        history.push(`/product/${id}`);
    }

    const renderProducts = () => {
        return products.length > 0 && (
            products.map((product) =>
                <Col key={product.id.toString()} xs={12} sm={12} md={4} lg={3} xl={3} className={cx("justify-content-center")}>
                    {renderProductCard(product)}
                </Col>
            )
        )
    }

    const renderProductCard = (product: IProduct) => {
        return (
            <Card data-testid={`product-${product.id}`} onClick={() => onProductCardClick(product.id)} className={cx("product-card")} key={product.id.toString()}>
                <Card.Img variant="top"
                          src={handleSrc(product)}
                          onLoad={() => handleOnLoad(product.id)}
                          onError={handleImgErr}/>
                <Card.Body>
                    <Card.Title>{product.title || "Product not found"}</Card.Title>
                    <Card.Text className={cx("price")}>{getProductPrice(store, product.price) || ""}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Container fluid data-testid={"container-landing"}>
            <Row className={cx("justify-content-space-between", "text-center", "landing-page")}>
                {renderProducts()}
            </Row>
        </Container>
    )
}

export default LandingPageComponent;

