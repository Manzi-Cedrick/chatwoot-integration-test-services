import React from "react";
import { Story, Meta } from "@storybook/react";
import BookmarkButton, { BookmarkButtonProps } from "./BookmarkButton";

export default {
  title: "Components/BookmarkButton",
  component: BookmarkButton,
} as Meta;

const Template: Story<BookmarkButtonProps> = (args) => (
  <BookmarkButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  post: {
    _id: "1",
    title: "Post Reference",
    author: "Test User",
    publishedDate: "2023-06-01",
  },
};

export const WithOpinion = Template.bind({});
WithOpinion.args = {
  opinion: {
    _id: "1",
    title: "First Opinion Review",
    author: "Dev User",
    category: "Politics",
  },
};
