import { useCallback } from "react";
import styles from "./css/takeActionPage.module.scss";
import Carousel from "../components/takeActionComponents/Carousel";

const TakeActionPage = () => {
  const onTextWrapperContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.headingParent}>
        <div className={styles.heading}>Take Action</div>
        <div className={styles.heading1}>
          You have taken your first step to become an air pollution activist! On
          this page, discover what behavior to implement into your daily life to
          combat air pollution at your own scale. Use the filtering system to
          find what action is right for you.
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.selectCategoriesWrapper}>
            <div className={styles.selectCategories}>
              <p className={styles.select}>{`Select `}</p>
              <p className={styles.select}>Categories</p>
            </div>
          </div>
          <div className={styles.dropdownMenu}>
            <div className={styles.filterItem}>
              <div className={styles.accessibility}>Accessibility</div>
              <img
                className={styles.mediaIconUnfilledChev}
                alt=""
                src="Media / Icon / Unfilled / cheveron-down.svg"
              />
            </div>
            <div className={styles.dropdownMenuInner}>
              <div className={styles.textWrapperParent}>
                <div
                  className={styles.textWrapper}
                  onClick={onTextWrapperContainerClick}
                >
                  <div className={styles.checkbox}>
                    <div className={styles.checkbox1} />
                    <div className={styles.label}>Individual</div>
                  </div>
                </div>
                <div className={styles.textWrapper1}>
                  <div className={styles.checkbox}>
                    <div className={styles.checkbox1} />
                    <div className={styles.label}>Community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dropdownMenudefaultno}>
            <div className={styles.accessibility1}>Target</div>
            <img
              className={styles.mediaIconUnfilledChev}
              alt=""
              src="Media / Icon / Unfilled / cheveron-down.svg"
            />
          </div>
          <div className={styles.dropdownMenudefaultno}>
            <div className={styles.accessibility1}>Difficulty</div>
            <img
              className={styles.mediaIconUnfilledChev}
              alt=""
              src="Media / Icon / Unfilled / cheveron-down.svg"
            />
          </div>
          <div className={styles.dropdownMenudefaultno}>
            <div className={styles.accessibility1}>Sector</div>
            <img
              className={styles.mediaIconUnfilledChev}
              alt=""
              src="Media / Icon / Unfilled / cheveron-down.svg"
            />
          </div>
        </div>
        <div className={styles.frameWrapper}>
          <div className={styles.frameContainer}>
            <div className={styles.frameChild} />
            <div className={styles.frameDiv}>
              <div className={styles.frameParent1}>
                <Carousel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeActionPage;
