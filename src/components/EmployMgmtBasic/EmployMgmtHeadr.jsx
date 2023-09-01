import Header from '../Commons/Header'

export default function EmployMgmtHeader() {
    return (
      <div>
        <Header title="사원" extraButtonComponents={
        <button>Add Employee</button>
        }  />

      </div>
    );
  }
  