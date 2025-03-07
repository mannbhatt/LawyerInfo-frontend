"use client"

import { useState, useEffect, use } from "react"
import { Edit2, Save, X } from "lucide-react"
import { formStyles as styles } from "../../ui/form_styles"



const ContributionEditForm = ({ contributions, onSave }) => {
    const [contributionList, setContributionList] = useState(contributions || []);
  
    const handleAdd = () => {
      setContributionList([
        ...contributionList,
        {
          title: "",
          description: "",
          category: "",
          external_link: "",
        },
      ]);
    };
  
    const handleChange = (index, field, value) => {
      const newList = [...contributionList];
      newList[index][field] = value;
      setContributionList(newList);
    };
  
    const handleRemove = (index) => {
      setContributionList(contributionList.filter((_, i) => i !== index));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(contributionList);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {contributionList.map((contribution, index) => (
          <div key={index} className="border p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={contribution.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={contribution.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={contribution.category}
                  onChange={(e) => handleChange(index, "category", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Category</option>
                  <option value="Blog">Blog</option>
                  <option value="Research Paper">Research Paper</option>
                  <option value="Project">Project</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  External Link
                </label>
                <input
                  type="url"
                  value={contribution.external_link}
                  onChange={(e) => handleChange(index, "external_link", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Contribution
          </button>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Save Changes
          </button>
        </div>
      </form>
    );
  };
  export default ContributionEditForm;
  