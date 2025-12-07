import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/common/Footer";
import Course_Card from "../components/core/Catalog/Course_Card";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import Loading from "./../components/common/Loading";

import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { fetchCourseCategories } from "./../services/operations/courseDetailsAPI";

function Catalog() {
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("catalogName", catalogName);

  // Fetch All Categories
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseCategories();
        console.log("Categories fetched:", res);
        const category_id = res.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;

        // console.log("category id is",category_id);

        setCategoryId(category_id);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
    })();
  }, [catalogName]);

  useEffect(() => {
    if (categoryId) {
      (async () => {
        setLoading(true);
        try {
          const res = await getCatalogPageData(categoryId);
          // console.log("chandan from caralog", res);

          setCatalogPageData(res);
          // console.log("chandan1",catalogPageData);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      })();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Loading />
      </div>
    );
  }

  if (!loading && !catalogPageData) {
    return (
      <div className="text-white text-4xl flex justify-center items-center mt-[20%]">
        No Courses found for selected Category
      </div>
    );
  }
  console.log("chandan2", catalogPageData);
  // Filter Courses based on active tab
  const coursesToShow =
    active === 1
      ? [...(catalogPageData?.selectedCategory?.courses || [])].sort(
          (a, b) => b.sold - a.sold // Most Popular (highest sold first)
        )
      : [...(catalogPageData?.selectedCategory?.courses || [])].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // New (latest first)
        );

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-900 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-4xl flex-col justify-center gap-4 lg:max-w-6xl">
          <p className="text-sm text-gray-300">
            {`Home / Catalog / `}
            <span className="text-yellow-500">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-white">
            {catalogPageData?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-gray-200">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto w-full max-w-4xl px-4 py-12 lg:max-w-6xl">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Courses to get you started
        </h2>
        <div className="my-4 flex border-b border-gray-700 text-sm">
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 1
                ? "border-b-2 border-yellow-500 text-yellow-500"
                : "text-gray-100"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 2
                ? "border-b-2 border-yellow-500 text-yellow-500"
                : "text-gray-100"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        {/* <Course_Slider
          Courses={catalogPageData?.selectedCategory?.courses}
        /> */}
        {active === 1 ? (
          <Course_Slider Courses={catalogPageData?.selectedCategory?.courses} />
        ) : (
          <Course_Slider
            Courses={catalogPageData?.mostSellingCourses}
          />
        )}
      </div>

      {/* Section 2 */}
      <div className="mx-auto w-full max-w-4xl px-4 py-12 lg:max-w-6xl">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Top courses in {catalogPageData?.differentCategory?.name}
        </h2>
        <Course_Slider Courses={catalogPageData?.differentCategory?.courses} />
      </div>

      {/* Section 3 */}
      <div className="mx-auto w-full max-w-4xl px-4 py-12 lg:max-w-6xl">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Frequently Bought
        </h2>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height="h-72" />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Catalog;
