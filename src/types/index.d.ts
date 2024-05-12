// declare interface BoardProps {
//   title?: string;
//   statuses?: string[];
// };

declare type SubTaskProps = {
  title?: string;
};

declare type TaskProps = {
  title?: string;
  description?: string;
  subTasks?: SubTaskProps[];
  status?: string;
  // boardId?: string;
};

declare type TaskBoardId = {
  boardId: string;
};
