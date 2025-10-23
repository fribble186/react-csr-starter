import { createBrowserRouter } from "react-router";
import { assocPath, pipe } from "ramda";
import type { RouteObject } from "react-router";
import { Component, Pages } from "./utils/lazyComponent";

/**
 * 把文件列表变成文件名树
 */
const transformPath2Tree = (
	importMetas: Record<string, () => Promise<unknown>>,
) => {
	let pathTree = {};

	const filePaths = Object.keys(importMetas)
		.map((path) => path.replace(/^\/src\/pages\//, "").replace(/\.tsx$/, ""))
		.filter((path) => !path.startsWith("system/"));

	for (const path of filePaths) {
		const levels = path.split("/");
		pathTree = assocPath(levels, "", pathTree);
	}
	return pathTree;
};
interface PathTreeNode {
	[key: string]: string | PathTreeNode;
}
/**
 * 把 path 树按照约定式路由规则变成 route 对象
 * @param curNode 当前 path tree 的枝干
 * @param routes 当前的 route 对象
 * @param parentPath 父级 uri
 * @returns route 对象
 */
function buildRoutes(
	curNode: PathTreeNode,
	routes: RouteObject = { path: "/", children: [] },
	parentPath: string = "/",
): RouteObject {
	for (const [key, val] of Object.entries(curNode)) {
		if (typeof val === "string") {
			const routeEle = Component(`/pages${parentPath}${key}`);
			switch (key) {
				case "layout":
					routes.element = routeEle;
					break;
				case "index":
					if (routes.children)
						routes.children.push({ index: true, element: routeEle });
					else routes.children = [{ index: true, element: routeEle }];
					break;
				case "[id]":
					if (routes.children)
						routes.children.push({ path: ":id", element: routeEle });
					else routes.children = [{ path: ":id", element: routeEle }];
					break;
			}
		} else {
			if (routes.children) {
				routes.children.push(
					buildRoutes(val, { path: key, children: [] }, `${parentPath}${key}/`),
				);
			} else {
				routes.children = [
					buildRoutes(val, { path: key, children: [] }, `${parentPath}${key}/`),
				];
			}
		}
	}
	return routes;
}

export default createBrowserRouter([
	pipe(transformPath2Tree, buildRoutes)(Pages),
	{ path: "*", element: Component("/pages/system/404") },
]);
