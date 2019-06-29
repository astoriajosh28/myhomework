--1. List the following details of each employee: employee number, last name, first name, gender, and salary.

SELECT employees.emp_no, employees.last_name, employees.first_name, employees.gender, salaries.salary
FROM employees, salaries
WHERE salaries.emp_no = employees.emp_no;

-- 2. List employees who were hired in 1986.

SELECT employees.last_name, employees.first_name, employees.hire_date
FROM employees
WHERE hire_date between '1985-12-31' and '1987-01-01';

-- 3. List the manager of each department with the following information:
-- department number, department name, the manager's employee number,
-- last name, first name, and start and end employment dates.

SELECT dept_manager.dept_no, departments.dept_name,
dept_manager.emp_no, employees.last_name, employees.first_name,
dept_manager.from_date,dept_manager.to_date
FROM dept_manager, departments, employees
WHERE dept_manager.dept_no = departments.dept_no AND
dept_manager.emp_no = employees.emp_no;

-- 4. List the department of each employee with the following information: 
-- employee number, last name, first name, and department name.

Select dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
From dept_emp
Left Join Employees ON dept_emp.emp_no = employees.emp_no
Left Join departments ON dept_emp.dept_no = departments.dept_no

-- 5. List all employees whose first name is "Hercules" and last names begin with "B."

Select emp_no, first_name, last_name
From employees
Where first_name = 'Hercules' AND last_name Like 'B%'