import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/takeActionPage.module.scss";
import Carousel from "../components/takeActionComponents/Carousel";
import Filter from "../components/takeActionComponents/Filter";
import { takeActions, TakeActionProps } from "../data/actions";
const TakeActionPage = () => {
  const navigate = useNavigate();
  const [filteredCards, setFilteredCards] =
    useState<TakeActionProps[]>(takeActions);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagCategories = {
    Actor: ["Individual", "Community"],
    Target: ["Reducing health risks", "Reducing air pollution"],
    Sector: [
      "Transportation",
      "Food",
      "Consumption habits",
      "Sports & health",
      "Activism",
      "Household",
    ],
  };
  const handleApplyFilters = () => {
    console.log(selectedTags);
    if (selectedTags.length === 0) {
      setFilteredCards(takeActions);
    } else {
      setFilteredCards(
        takeActions.filter((card) =>
          selectedTags.every((tag) => card.tags.includes(tag))
        )
      );
    }
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setFilteredCards(takeActions);
  };

  return (
    <div className={styles.page}>
      <div className={styles.headingParent}>
        <div className={styles.heading}>Take Action</div>
        <div className={styles.subheading}>
          You have taken your first step to become an air pollution activist! On
          this page, discover what behavior to implement into your daily life to
          combat air pollution at your own scale. Use the filtering system to
          find what action is right for you.
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.frameGroup}>
          <div className={styles.filterWrapper}>
            <div className={styles.filterTitle}>
              <p>Filter by</p>
              <p>Categories</p>
            </div>

            <Filter
              title="Actors"
              options={tagCategories.Actor}
              selectedOptions={selectedTags}
              onChange={setSelectedTags}
            />

            <Filter
              title="Sectors"
              options={tagCategories.Sector}
              selectedOptions={selectedTags}
              onChange={setSelectedTags}
            />
            <Filter
              title="Targets"
              options={tagCategories.Target}
              selectedOptions={selectedTags}
              onChange={setSelectedTags}
            />

            <div className={styles.buttons}>
              <button onClick={handleApplyFilters}>Apply Filters</button>
              <button onClick={handleClearFilters}>Clear Filters</button>
            </div>
          </div>
        </div>

        <div className={styles.frameWrapper}>
          <div className={styles.frameContainer}>
            <div className={styles.frameChild} />
            <div className={styles.frameDiv}>
              <div className={styles.carousel}>
                {filteredCards.length > 0 ? (
                  <Carousel actions={filteredCards} />
                ) : (
                  <p>
                    No Actions found based on current filter combinations.
                    Please clear one of the filters and try again.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div
            className={styles.ending}
            onClick={() => {
              navigate("/");
            }}
          >
            Finish My Journey
          </div>
        </div>
      </main>
    </div>
  );
};

export default TakeActionPage;
