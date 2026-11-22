import { RepoFile } from "@/types/repo";

// A tiny built-in project so first-time visitors can try the whole workflow
// without having a repository at hand.

const ROOT = "sample-todo-api";

const sources: Record<string, string> = {
    "README.md": [
        "# Sample Todo API",
        "",
        "A tiny Express + TypeScript service used to demo CodePiler.",
        "",
        "- `GET /todos` — list todos",
        "- `POST /todos` — create a todo",
        "- `PATCH /todos/:id/toggle` — toggle completion",
        "- `DELETE /todos/:id` — delete a todo",
        ""
    ].join("\n"),

    ".gitignore": ["node_modules", "dist", ".env", ""].join("\n"),

    "package.json": JSON.stringify(
        {
            name: "sample-todo-api",
            version: "1.0.0",
            scripts: { dev: "tsx watch src/index.ts", test: "vitest" },
            dependencies: { express: "^4.19.2" },
            devDependencies: {
                "@types/express": "^4.17.21",
                tsx: "^4.7.0",
                typescript: "^5.4.0",
                vitest: "^1.5.0"
            }
        },
        null,
        2
    ),

    "src/index.ts": [
        'import express from "express";',
        'import { todosRouter } from "./routes/todos";',
        "",
        "const app = express();",
        "app.use(express.json());",
        'app.use("/todos", todosRouter);',
        "",
        "const port = Number(process.env.PORT ?? 3000);",
        'app.listen(port, () => console.log("Listening on port " + port));',
        ""
    ].join("\n"),

    "src/types.ts": [
        "export type Todo = {",
        "    id: number;",
        "    title: string;",
        "    completed: boolean;",
        "    createdAt: Date;",
        "};",
        ""
    ].join("\n"),

    "src/services/todo-service.ts": [
        'import { Todo } from "../types";',
        "",
        "const todos: Todo[] = [];",
        "let nextId = 1;",
        "",
        "export function listTodos() {",
        "    return todos;",
        "}",
        "",
        "export function createTodo(title: string): Todo {",
        "    const todo = { id: nextId++, title, completed: false, createdAt: new Date() };",
        "    todos.push(todo);",
        "    return todo;",
        "}",
        "",
        "export function toggleTodo(id: number) {",
        "    const todo = todos.find((t) => t.id == id);",
        "    todo!.completed = !todo!.completed;",
        "    return todo;",
        "}",
        "",
        "export function deleteTodo(id: number) {",
        "    const index = todos.findIndex((t) => t.id === id);",
        "    todos.splice(index, 1);",
        "}",
        ""
    ].join("\n"),

    "src/routes/todos.ts": [
        'import { Router } from "express";',
        'import { createTodo, deleteTodo, listTodos, toggleTodo } from "../services/todo-service";',
        "",
        "export const todosRouter = Router();",
        "",
        'todosRouter.get("/", (_req, res) => {',
        "    res.json(listTodos());",
        "});",
        "",
        'todosRouter.post("/", (req, res) => {',
        "    const todo = createTodo(req.body.title);",
        "    res.status(201).json(todo);",
        "});",
        "",
        'todosRouter.patch("/:id/toggle", (req, res) => {',
        "    res.json(toggleTodo(Number(req.params.id)));",
        "});",
        "",
        'todosRouter.delete("/:id", (req, res) => {',
        "    deleteTodo(Number(req.params.id));",
        "    res.status(204).end();",
        "});",
        ""
    ].join("\n"),

    "tests/todo-service.test.ts": [
        'import { describe, expect, it } from "vitest";',
        'import { createTodo, toggleTodo } from "../src/services/todo-service";',
        "",
        'describe("todo service", () => {',
        '    it("creates a todo", () => {',
        '        const todo = createTodo("Write docs");',
        "        expect(todo.completed).toBe(false);",
        "    });",
        "",
        '    it("toggles a todo", () => {',
        '        const todo = createTodo("Ship it");',
        "        expect(toggleTodo(todo.id)?.completed).toBe(true);",
        "    });",
        "});",
        ""
    ].join("\n")
};

export function getSampleProject(): RepoFile[] {
    return Object.entries(sources).map(([path, content]) => ({
        path: `${ROOT}/${path}`,
        content,
        size: new Blob([content]).size
    }));
}
