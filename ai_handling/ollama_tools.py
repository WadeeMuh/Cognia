import sympy as sp
from sympy import symbols, solve, simplify, sqrt, pi
import math
from pint import UnitRegistry

ureg = UnitRegistry()

def calculate(expression: str) -> str:
    """Basic arithmetic"""
    try:
        result = eval(expression, {"__builtins__": {}}, {"math": math, "sqrt": math.sqrt, "pi": math.pi})
        return str(result)
    except Exception as e:
        return f"Error: {e}"

def solve_equation(equation: str, variable: str) -> str:
    """
    Solves algebraic equations symbolically.
    e.g. equation='v**2 - u**2 - 2*a*s', variable='v'
    """
    try:
        var = symbols(variable)

        all_vars = list(sp.sympify(equation).free_symbols)
        result = solve(sp.sympify(equation), var)
        return str(result)
    except Exception as e:
        return f"Error: {e}"

def convert_units(value: float, from_unit: str, to_unit: str) -> str:
    """
    Converts between units.
    e.g. value=100, from_unit='meter', to_unit='foot'
    """
    try:
        result = (value * ureg(from_unit)).to(to_unit)
        return str(result)
    except Exception as e:
        return f"Error: {e}"

def evaluate_formula(formula: str, variables: dict) -> str:
    """
    Substitutes values into a formula and evaluates it.
    e.g. formula='F * d', variables={'F': 10, 'd': 5}
    Useful for physics formulas like KE = 0.5 * m * v**2
    """
    try:
        syms = {k: sp.Symbol(k) for k in variables}
        expr = sp.sympify(formula, locals=syms)
        result = expr.subs(variables)
        return str(sp.simplify(result))
    except Exception as e:
        return f"Error: {e}"

tool_map = {
    "calculate": calculate,
    "solve_equation": solve_equation,
    "convert_units": convert_units,
    "evaluate_formula": evaluate_formula
}

tools = [
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "Evaluates basic arithmetic. Use for simple number calculations such as multiplication and division. For example: 10 * 11 or 10 - 9 or 5 + 6 or 5 / 10.",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "e.g. '9.8 * 10' or 'sqrt(144)'"}
                },
                "required": ["expression"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "solve_equation",
            "description": "Solves algebraic equations for a variable. Use for physics/chemistry equations like F=ma, PV=nRT.",
            "parameters": {
                "type": "object",
                "properties": {
                    "equation": {"type": "string", "description": "Equation set to 0, e.g. 'F - m*a'"},
                    "variable": {"type": "string", "description": "The variable to solve for, e.g. 'F'"}
                },
                "required": ["equation", "variable"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "convert_units",
            "description": "Converts between units. Use whenever a problem involves unit conversion.",
            "parameters": {
                "type": "object",
                "properties": {
                    "value": {"type": "number"},
                    "from_unit": {"type": "string", "description": "e.g. 'meter', 'kelvin', 'joule'"},
                    "to_unit": {"type": "string", "description": "e.g. 'foot', 'celsius', 'calorie'"}
                },
                "required": ["value", "from_unit", "to_unit"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "evaluate_formula",
            "description": "Plugs values into a formula and computes the result. Use for formulas like KE=0.5*m*v^2, PV=nRT.",
            "parameters": {
                "type": "object",
                "properties": {
                    "formula": {"type": "string", "description": "e.g. '0.5 * m * v**2'"},
                    "variables": {"type": "object", "description": "e.g. {'m': 5, 'v': 10}"}
                },
                "required": ["formula", "variables"]
            }
        }
    }
]