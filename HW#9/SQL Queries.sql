--1. List the following details of each employee: employee number, last name, first name, gender, and salary.

SELECT employees.emp_no, employees.last_name, employees.first_name, employees.gender, salaries.salary
FROM employees, salaries
WHERE salaries.emp_no = employees.emp_no;

-- 2. List employees who were hired in 1986.

SELECT employees.last_name, employees.first_name, employees.hire_date
FROM employees
WHERE hire_date between '1985-12-31' and '1987-01-01';