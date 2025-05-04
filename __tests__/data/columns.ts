// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { openEdit, openDelete, changeStatus } from '@/redux/store';
// import TableColumns from '@/app/todos/data/columns';
// import { changeTodoStatus } from '@/app/todos/service/todos';

// vi.mock('../service/todos', () => ({
//     changeTodoStatus: vi.fn(() => Promise.resolve(true)),
// }));


// vi.mock('sonner', () => ({
//     toast: {
//         error: vi.fn(),
//         success: vi.fn(),
//     },
// }));

// const dispatch = vi.fn();
// vi.mock('react-redux', async () => {
//   const actual = await vi.importActual('react-redux');
//   return {
//     ...actual,
//     useDispatch: () => dispatch,
//     useSelector: (fn: any) =>
//       fn({
//         todos: {
//           todos: [
//             {
//               id: "1",
//               name: "Test Todo",
//               priority: "low",
//               dueDate: "2024-05-05",
//               done: "false",
//               doneDate: null,
//               creationDate: "2024-05-01",
//             },
//           ],
//         },
//       }),
//   };
// });


// describe('TableColumns', () => {
//     beforeEach(() => {
//         vi.clearAllMocks();
//     });

//     it('should call openEdit when edit is clicked', () => {
//         const columns = TableColumns();
//         const editCell = columns.find((col) => col.id === 'actions');

//         const mockRow = {
//             getValue: vi.fn((key) => key === 'id' ? '1' : 'false'),
//         };

//         // Simulate clicking Edit
//         (mockRow.getValue as any).mockReturnValueOnce('1').mockReturnValueOnce('false');
//         const columnsAgain = TableColumns();

//         // Simulate calling edit
//         const cellRenderer = columnsAgain.find(col => col.id === 'actions')?.cell as Function;
//         cellRenderer?.({ row: mockRow });

//         // Simulate calling edit
//         expect(dispatch).toHaveBeenCalledWith(openEdit('1'));
//     });

//     it('should call openDelete when delete is clicked', () => {
//         const columns = TableColumns();
//         // const deleteHandler = columns.find(col => col.id === 'actions')?.cell;
//         const mockRow = {
//             getValue: (key: string) => key === 'done' ? 'false' : '1',
//         };
//         const cellRenderer = columns.find(col => col.id === 'actions')?.cell as Function;
//         cellRenderer?.({ row: mockRow });

//         expect(dispatch).toHaveBeenCalledWith(openDelete('1'));
//     });

//     it('should call changeStatus when checkbox is toggled', async () => {
//         const columns = TableColumns();
//         const checkboxColumn = columns.find(col => col.id === 'select');

//         const mockRow = {
//             getValue: (key: string) => key === 'id' ? '1' : 'true',
//             getIsSelected: () => false,
//             toggleSelected: vi.fn(),
//         };

//         const cellRenderer = columns.find(col => col.id === 'select')?.cell as Function;
//         const checkbox = cellRenderer?.({ row: mockRow });

//         expect(checkbox).toBeTruthy();

//         await (checkbox as any).props.onCheckedChange(true);
//         expect(changeTodoStatus).toHaveBeenCalledWith('1');
//         expect(dispatch).toHaveBeenCalledWith(changeStatus({ id: '1' }));
//     });
// });

