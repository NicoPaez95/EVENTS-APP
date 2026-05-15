/**
 * @file cn.js
 * @description Utility to merge Tailwind classes safely without style conflicts.
 * Combines clsx for conditional classes and tailwind-merge to handle overrides.
 * @module shared/utils/cn
 * @author Nico Paez
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names or conditional class objects into a single string,
 * resolving Tailwind CSS specificity conflicts automatically.
 *
 * @param {...(string|Object|Array)} inputs - Class names or clsx-compatible objects.
 * @returns {string} A clean, conflict-free string of classes.
 */
export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};